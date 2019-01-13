from flask import Flask
from flask_restful import Api, Resource, reqparse

import pymongo
from bson import ObjectId

import pdb


app = Flask(__name__)
api = Api(app)


sa_mongo = pymongo.MongoClient('localhost:27017')
sa_db = sa_mongo['slideatlas']


# Start Demo / example ---------------------------------------------
users = [
    {
        "name": "Charles",
        "age": 52
    }
]

class User(Resource):

    def get(self, name):
        print("get " + name)
        for user in users:
            if name == user['name']:
                return user, 200
        return "User not found", 404

        
    def post(self, name):
        print("post " + name)
        parser = reqparse.RequestParser()
        parser.add_argument("age")
        args = parser.parse_args()
        
        for user in users:
            if name == user['name']:
                return "User with name {} alerady exists.".format(name), 400

        user = {
            "name": name,
            "age": args['age']
        }
        users.append(user)
        return user, 201


        
    def put(self, name):
        print("put " + name)
        parser = reqparse.RequestParser()
        parser.add_argument("age")
        args = parser.parse_args()
        
        for user in users:
            if name == user['name']:
                user['age'] = args['age']
                return user, 200

        user = {
            "name": name,
            "age": args['age']
        }
        users.append(user)
        return user, 201

        

    def delete(self, name):
        print("delete " + name)
        global users
        users = [user for user in users if user['name'] != name]
        return "{} is deleted.".format(name), 200

api.add_resource(User, "/user/<string:name>")

# End Demo / example ---------------------------------------------




translation_table = {
    '50763f3102e3100690258a8c': {'itemId':'5b3fc8311fbb900623fe2c9e',
                                 'server':'https://images.slide-atlas.org'}
}









def convert_viewer_record(vr):
    """
    Simple straight forward.  One image, one viewer.
    """
    image = sa_db['images'].find_one({'_id':vr['Image']})

    if image is None:
        return "Missing image: %s"%vr['Image'], 404

    if not 'girder' in image:
        # For images diced into SA mongo and the re uploaded to girder.
        if vr['image'] in translation_table:
            image['girder'] = translation_table[vr['image']]
        else:
            return "Image is not on girder, image:%s"%vr['Image'], 404

    ret = {'imageId':    str(image['girder']['itemId']),
           'server':     image['girder']['server'],
           'levels':     image['levels'],
           'dimensions': image['dimensions'],
           'tileSize':   [image['TileSize'], image['TileSize']]}

    if 'Camera' in vr:
        ret['camera'] = vr['Camera']
    if 'OverviewBounds' in vr:
        ret['overview'] = vr['OverviewBounds']

    return ret, 200
        

def convert_view(old_view):
    """
    Change viewer record list with multiple items into a view with children.
    Strictly separate nodes and leaves.  Only leafs have an image.
    """
    # Make these field to avoid checking if they exist.
    if not 'Children' in old_view:
        old_view['Children'] = []
    if not 'ViewerRecords' in old_view:
        old_view['ViewerRecords'] = []

    # The new list of children
    children = []
        
    # First convert viewer records into the first child.
    # If there is only one viewer record, make it a leaf view.
    if len(old_view['ViewerRecords']) == 1:
        leaf, code = convert_viewer_record(old_view['ViewerRecords'][0])
        if code != 200:
            error_message = "%s, view:%s"%(leaf,old_view['_id'])
            return error_message, code
        children.append(leaf)
    if len(old_view['ViewerRecords']) > 1:
        node = {'children': [],
                'type': 'multi'}
        for vr in old_view['ViewerRecords']:
            leaf, code = convert_viewer_record(vr)
            if code != 200:
                error_message = "%s, view:%s"%(leaf,old_view['_id'])
                return leaf, code
            node['children'].append(leaf)
        children.append(node)

    # Now add the old children.
    for child in old_view['Children']:
        view, code = convert_view(child)
        if code != 200:
            error_message = "%s, view:%s"%(leaf,old_view['_id'])
            return view, code
        children.append(view)

    # Flatten views with only one child
    if len(children) == 0:
        error_message = "No image, view:%s"%(old_view['_id'])
        return error_message, 404
    if len(children) == 1:
        view = children[0]
    else:
        view = {'children': children}
    
    view['_id'] = str(old_view['_id'])
    if 'Title' in old_view:
        view['title'] = old_view['Title']
    return view, 200





class View(Resource):

    def get(self, id):
        print("get " + id)

        view = sa_db['views'].find_one({'_id':ObjectId(id)})
        if view is None:
            return "Missing view:%s"%id, 404

        return convert_view(view)


    
api.add_resource(View, "/view/<string:id>")





@app.route('/')
def hello():
    return "Hello world!"





if __name__ == '__main__':
    app.run(debug=True)

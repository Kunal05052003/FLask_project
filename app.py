from flask import Flask, jsonify
from flask_graphql import GraphQLView
import graphene
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
tasks = [
    {'id': 1, 'title': 'Task 1', 'description': 'Description for Task 1', 'time': '10:00 AM'},
    {'id': 2, 'title': 'Task 2', 'description': 'Description for Task 2', 'time': '02:30 PM'},
]
class Task(graphene.ObjectType):
    id = graphene.Int()
    title = graphene.String()
    description= graphene.String()
    time=graphene.String()
class TaskInput(graphene.InputObjectType):
    title = graphene.String()
    description= graphene.String()
    time=graphene.String()

class Query(graphene.ObjectType):
    tasks = graphene.List(Task)

    def resolve_tasks(self, info):
        # You need to implement fetching tasks from your database here
        # For simplicity, using a hardcoded list
        return tasks
class AddTask(graphene.Mutation):
    class Arguments:
        input = TaskInput(required=True)


    task = graphene.Field(lambda: Task)

    def mutate(self, info, input):
        new_task = {'id': len(tasks) + 1, 'title': input.title,'description': input.description,
            'time': input.time}
        tasks.append(new_task)
        return AddTask(task=new_task)
class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = TaskInput(required=True)


    task = graphene.Field(lambda: Task)

    def mutate(self, info, id, input):
        for task in tasks:
            if task['id'] == id:
                task['title'] = input.title
                task['description']=input.description
                task['time'] = input.time
                return UpdateTask(task=task)
        return None

class DeleteTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        global tasks
        tasks = [task for task in tasks if task['id'] != id]
        return DeleteTask(success=True)

class Mutation(graphene.ObjectType):
    add_task = AddTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()

    

schema = graphene.Schema(query=Query,mutation=Mutation)

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

if __name__ == '__main__':
    app.run(debug=True)






# from flask import Flask, jsonify, request
# from flask_graphql import GraphQLView
# from flask_cors import CORS
# import graphene
# import stripe

# app = Flask(__name__)
# CORS(app)

# # Set your Stripe secret key
# stripe.api_key = 'sk_test_51ORgtSSCCAPHVW4GwwV5uNiE6kTov1Aj1e5cYpjLEHjV2E5YnIVCIdAa1EUbWI8TkMv6nL0feSbnTknJJ33pML0Y00PkC6ge92'

# # In-memory database (replace with a real database in a production environment)
# tasks = [
#     {'id': 1, 'title': 'Task 1', 'description': 'Description for Task 1', 'time': '10:00 AM'},
#     {'id': 2, 'title': 'Task 2', 'description': 'Description for Task 2', 'time': '02:30 PM'},
# ]

# class Task(graphene.ObjectType):
#     id = graphene.Int()
#     title = graphene.String()
#     description = graphene.String()
#     time = graphene.String()
#     hasProLicense = graphene.Boolean()

# class TaskInput(graphene.InputObjectType):
#     title = graphene.String()
#     description = graphene.String()
#     time = graphene.String()

# class ProLicense(graphene.ObjectType):
#     id = graphene.Int()
#     hasProLicense = graphene.Boolean()

# class ProLicenseInput(graphene.InputObjectType):
#     stripeToken = graphene.String()

# class Query(graphene.ObjectType):
#     tasks = graphene.List(Task)
#     pro_license = graphene.Field(ProLicense)

#     def resolve_tasks(self, info):
#         return tasks

#     def resolve_pro_license(self, info):
#         return {'id': 1, 'hasProLicense': True}

# class AddTask(graphene.Mutation):
#     class Arguments:
#         input = TaskInput(required=True)

#     task = graphene.Field(lambda: Task)

#     def mutate(self, info, input):
#         new_task = {
#             'id': len(tasks) + 1,
#             'title': input.title,
#             'description': input.description,
#             'time': input.time,
#             'hasProLicense': True  # Assume any user can add tasks (replace with actual logic)
#         }
#         tasks.append(new_task)
#         return AddTask(task=new_task)

# class UpdateTask(graphene.Mutation):
#     class Arguments:
#         id = graphene.Int(required=True)
#         input = TaskInput(required=True)

#     task = graphene.Field(lambda: Task)

#     def mutate(self, info, id, input):
#         for task in tasks:
#             if task['id'] == id:
#                 task['title'] = input.title
#                 task['description'] = input.description
#                 task['time'] = input.time
#                 task['hasProLicense'] = True  # Assume any user can update tasks (replace with actual logic)
#                 return UpdateTask(task=task)
#         return None

# class DeleteTask(graphene.Mutation):
#     class Arguments:
#         id = graphene.Int(required=True)

#     success = graphene.Boolean()

#     def mutate(self, info, id):
#         global tasks
#         tasks = [task for task in tasks if task['id'] != id]
#         return DeleteTask(success=True)

# class UpgradeToProLicense(graphene.Mutation):
#     class Arguments:
#         input = ProLicenseInput(required=True)

#     success = graphene.Boolean()

#     def mutate(self, info, input):
#         # Use Stripe to process the payment
#         try:
#             stripe.PaymentIntent.create(
#                 amount=999,  # $9.99 in cents
#                 currency='usd',
#                 description='Pro License Purchase',
#                 payment_method=input.stripeToken,
#                 confirmation_method='manual',
#                 confirm=True
#             )
#             # Assume the payment is successful (replace with actual logic)
#             return UpgradeToProLicense(success=True)
#         except stripe.error.CardError as e:
#             # Error handling for card errors
#             return UpgradeToProLicense(success=False)

# class Mutation(graphene.ObjectType):
#     add_task = AddTask.Field()
#     update_task = UpdateTask.Field()
#     delete_task = DeleteTask.Field()
#     upgrade_to_pro_license = UpgradeToProLicense.Field()

# schema = graphene.Schema(query=Query, mutation=Mutation)

# app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

# if __name__ == '__main__':
#     app.run(debug=True)







# from flask import Flask, jsonify, request
# from flask_graphql import GraphQLView
# from flask_cors import CORS
# from flask_keycloak import Keycloak
# import graphene

# app = Flask(__name__)
# CORS(app)

# # Configure Keycloak
# app.config['KEYCLOAK_SERVER_URL'] = 'YOUR_KEYCLOAK_SERVER_URL'
# app.config['KEYCLOAK_REALM'] = 'YOUR_REALM'
# app.config['KEYCLOAK_CLIENT_ID'] = 'YOUR_CLIENT_ID'
# keycloak = Keycloak(app)

# # In-memory database (replace with a real database in a production environment)
# tasks = [
#     {'id': 1, 'title': 'Task 1', 'description': 'Description for Task 1', 'time': '10:00 AM'},
#     {'id': 2, 'title': 'Task 2', 'description': 'Description for Task 2', 'time': '02:30 PM'},
# ]

# class Task(graphene.ObjectType):
#     id = graphene.Int()
#     title = graphene.String()
#     description = graphene.String()
#     time = graphene.String()

# class TaskInput(graphene.InputObjectType):
#     title = graphene.String()
#     description = graphene.String()
#     time = graphene.String()

# class Query(graphene.ObjectType):
#     tasks = graphene.List(Task)

#     @keycloak.protect()
#     def resolve_tasks(self, info):
#         return tasks

# class AddTask(graphene.Mutation):
#     class Arguments:
#         input = TaskInput(required=True)

#     task = graphene.Field(lambda: Task)

#     @keycloak.protect()
#     def mutate(self, info, input):
#         new_task = {
#             'id': len(tasks) + 1,
#             'title': input.title,
#             'description': input.description,
#             'time': input.time
#         }
#         tasks.append(new_task)
#         return AddTask(task=new_task)

# class UpdateTask(graphene.Mutation):
#     class Arguments:
#         id = graphene.Int(required=True)
#         input = TaskInput(required=True)

#     task = graphene.Field(lambda: Task)

#     @keycloak.protect()
#     def mutate(self, info, id, input):
#         for task in tasks:
#             if task['id'] == id:
#                 task['title'] = input.title
#                 task['description'] = input.description
#                 task['time'] = input.time
#                 return UpdateTask(task=task)
#         return None

# class DeleteTask(graphene.Mutation):
#     class Arguments:
#         id = graphene.Int(required=True)

#     success = graphene.Boolean()

#     @keycloak.protect()
#     def mutate(self, info, id):
#         global tasks
#         tasks = [task for task in tasks if task['id'] != id]
#         return DeleteTask(success=True)

# class Mutation(graphene.ObjectType):
#     add_task = AddTask.Field()
#     update_task = UpdateTask.Field()
#     delete_task = DeleteTask.Field()

# schema = graphene.Schema(query=Query, mutation=Mutation)

# app.add_url_rule('/graphql', view_func=keycloak.requires_auth(GraphQLView.as_view('graphql', schema=schema, graphiql=True)))

# if __name__ == '__main__':
#     app.run(debug=True)

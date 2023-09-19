 """
    The `addUser` function is used to add a new user to the database, encrypting their password and
    returning a success message.
    
    :param event: The `event` parameter is a dictionary that contains information about the event that
    triggered the function. It typically includes details such as the HTTP request headers, body, and
    other relevant information
    :param context: The `context` parameter is an object that provides information about the runtime
    environment of the function. It includes details such as the AWS request ID, function name, and
    other contextual information. In this code snippet, the `context` parameter is not used, so it can
    be removed from the function signature
    :return: a response object with a status code of 201 (indicating a successful creation) and a body
    containing a JSON message indicating that the user with the specified ID was created successfully.
    """
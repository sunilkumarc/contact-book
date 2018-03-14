# Contact Book

Basic authentication has been enabled on the backend. Right now below username and password should be encoded in base64 format and sent in every request.
````
username: admin
password: supersecret
````

### Add a contact
```
URL
    https://contacts-book-plivo.herokuapp.com/contact/add
    
HEADERS
    Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ=
    Content-Type: application/json
    
BODY
    {
        "email": "user1@gmail.com",
        "name": "user1"
    }
```

### Edit a contact
```
URL
	https://contacts-book-plivo.herokuapp.com/contact

HEADERS
	Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ=
	Content-Type: application/json

BODY
	{
		"email": "user1@gmail.com",
		"name": "user1 updated"
	}
```

### Delete a contact
```
URL
	https://contacts-book-plivo.herokuapp.com/contact?email=user1@gmail.com

HEADERS
	Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ=
	Content-Type: application/json
```

### Get a contact by email
```
URL
	https://contacts-book-plivo.herokuapp.com/contact?email=user1@gmail.com

HEADERS
	Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ=
	Content-Type: application/json
```

### Get all contacts starting with a string (return at most 10 values, default page = 1)
```
URL
	https://contacts-book-plivo.herokuapp.com/contact?name=user

HEADERS
	Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ=
	Content-Type: application/json
```

### Get all contacts starting with a string (page = 2, page req param can be used to get paginated values)
```
URL
	https://contacts-book-plivo.herokuapp.com/contact?name=user&page=2

HEADERS
	Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ=
	Content-Type: application/json
```
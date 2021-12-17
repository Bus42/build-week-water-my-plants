# Build Week Water My Plants API

To reset the database, run the following command: `npm run reset`

## Endpoints

### /users

    GET | returns all users

```
[
{
"id": 1,
"username": "Carmina",
"phoneNumber": "733-722-5325"
},
{
"id": 2,
"username": "Lorrayne",
"phoneNumber": "531-724-7780"
},
...
]
```

    POST | creates a new user, returns the newly created user

```
{
"id": 204,
"username": "leeroy jenkins",
"phoneNumber": "555-123-4567"
}

    Store the username in local storage and use it to pre-populate the username field on the login page
```

### /users/:id

    PUT | updates a user, returns the updated user

```
{
	"id": 201,
	"username": "Leroy Jenkins",
	"phoneNumber": "123-555-4567"
}
```

### /login

    POST | logs in a user, returns a JWT

```
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlZXJveSBqZW5raW5zIiwiaWF0IjoxNjM5NjI4ODk2LCJleHAiOjE2Mzk2MzI0OTZ9.rRHCA0pQMFIBs-5jLbDmEEQgjBAxSUHSYoSM64-xRI0"
```

    Store the JWT in local storage and use it to authenticate all future requests. Since JWTs are not cancelable, they should be deleted when the user logs out.

### /plants

    GET | returns all plants with optional url64 encoded image

```
    {
    	"id": 1,
    	"nickname": "Needle Lichen",
    	"species": "Coniocybaceae",
    	"h2ofrequency": "17",
    	"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFjSURBVDjLpZPdS8JgFMb9FyUpieiDwoKklUNhUwIJKYhCRFrah1FSzDRaFGFRFHbRF0mSkJX3QTddeKfz9J7z5mbtIpoPPLww9vzOw9leBwA4OrHDOaWOL2jVWnDnDeRt5vQLSJvPENgog3/9CcS1EviSRZhMPICwdAfe+A3Iyasa5ggQyVb1WP4d/msheqkTACfbsWf+Agggp1/BjoZnzzhA2qrQg3DBNErQPIZRy0XTqMHIyTeALawFSJV+AhLFKJ3NZpOCuYoJ6A8fcwBu+68Guq5bGvRNH3EAfqrfwoktY7jdjUaD3ukNHXCAuPpomYhBUFyGMfhZHjWMcsv7HCAo9wYgVVKMyhTOiHTiVAp+rBgAlz/LARPxW0sDqtnWoF6vWxp0iRkO8Maubf0HTp8Krbugji0W6M8amTuHocgpDMzk2ZYPaVHuoAY90h50B3Ks9i6brALLoFUCdHwbOwV8AQoMLgCS+2NeAAAAAElFTkSuQmCC"
    },
    {
    	"id": 4,
    	"nickname": "Western Sandparsley",
    	"species": "Apiaceae",
    	"h2ofrequency": "15",
    	"image": null
    },
```

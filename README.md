# Build Week Water My Plants API

API hosted on [Heroku](https://fast-sands-01851.herokuapp.com/)

If running locally, reset the database by run the following command: `npm run reset`

## User can:

- Register
- Login
- Edit user profile
- Delete profile
- Get list of users
- Get list of plants
- Add plants to db
- Edit plant entry
- Remove plant entry
- Get list of a user's plants
- Add a plant to a user's list
- Remove a plant from a user's list

Authentication is handled via [JWT](https://jwt.io/). Destroy JWT on logout.

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

    DELETE | deletes a user, returns the deleted user

```
{
	"message": "user deleted:",
	"user": {
		"id": "201"
	}
}
```

### /users/:id/plants

    GET | returns all plants for a user

```
[{
	"id": 78,
	"user_id": 116,
	"plant_id": 78,
	"nickname": "Edible Thistle",
	"species": "Asteraceae",
	"h2ofrequency": "5",
	"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJlSURBVDjLpZNrSJNRGMdlr7qat+zKaoYhjqYphRCWCtKFoCj60CeRpDB0djHUSMOZm0JhGEmlNhczXXunDgy7TNcVcsjGpk6dNsiJyyjWNg3ZnJfef69vMBBkFn34wXMu/995DocTBCDof1h1cvBJnM5RTsBVyYLzBgvfigjopbGDfyUwK+Nfu2RsTNcTDO5aAk4RC1/KQ2BqjetbU+AiOZip/xNyLndQSeCHmMBUIQFzTjDWFDiu0O0qzmJKU4OvPSmYuETAXhKM8WshsOYR0NZlRAUUtOXt+Dk99hYufSu+6x7D8fEAnLozmLEq0V3M8ww1F4QGFEhz+Aa3QQmHsQPeQZJGxdRuEwnp+SRjwCs0FpwIf3guwfayKBE+owxzI50M3oGn0JbuQW323vE7uac2rSpoFB6Pll/M0FjEofDZe2Go2ocu0VGG5dpjUWOEXpPlp72X5h/irhBIcrNYNunp5s+31gFTWmCsAfiQDWiOgXq2H1Q7H1TPSVCfmjBaHY4HFzJfNOQd5vgFZGHmo5n7bEBfQlPMBNGVCqgTQZGxWGjhwivbCKorHb/UybDf5UFekE76Bf3lu5ccz0uxpIgBOvgMlGoXPeZhvnkbHY7GbEMYnHVseKQb4OquQF+JYMEvMIsElFsroTfQL/TqCBYVOzHfsh0++RZ4mqIxJ98Kj2wzc7qtJhLTb6pguJ5A+QXDLZfLTGXxi45762G7TUs6BKtirWZjWByG/opkH52pWvEKEyphRK8oLan9aurkgCSGslRHYVTCwQjNkDgSpptcqrMwafZd2cGUyTZhRMDf+C/8Blefvm4GxFC9AAAAAElFTkSuQmCC"
},
{
	"id": 183,
	"user_id": 116,
	"plant_id": 183,
	"nickname": "American Pistachio",
	"species": "Anacardiaceae",
	"h2ofrequency": "4",
	"image": null
}]
```

    POST | adds plant to list of user's plants, returning list of user's plants

```
request body: {
	"plant_id": "42"
}
```

```
response: [
	{
		"id": 42,
		"user_id": 42,
		"plant_id": 42,
		"nickname": "Showy Evening Primrose",
		"species": "Onagraceae",
		"h2ofrequency": "22",
		"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC3SURBVCjPvdCxDYMwEAVQSxQ0CImKKldE19FRITeu3LihiGQGYYKbIBtkgtuACdiACW4NcgEnpKJE11j6T98+m9Wcj7kERIqsM6ymHwJ7dvQJmhvSryFK5N1rLFtc4gT8Bx4JOO42gC+Y6wM8pJ/D6Ec3dnOrAJ9ga64O0EtIDS3fBS0sGi/FklMCQXwCjQIoa1vZYsqnrEnAi0sAGWQ/5Zx9r/CkT+NW18QBWMu39TIydN1Xn88bUK7xEQPM95QAAAAASUVORK5CYII="
	},
	...
]
```
 	DELETE | removes plant from list of user's plants, returning a list of user's plants
```
request body: {
	"plant_id": "42"
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

#!/bin/bash

heroku container:push web --app tripalium-backend  
heroku container:release web --app tripalium-backend
## ScreenShot
![images](https://github.com/YunDobi/TasksApp/blob/main/public/main%20screen.png)
![images](https://github.com/YunDobi/TasksApp/blob/main/public/GraphQL%20SC.png)
![images](https://github.com/YunDobi/TasksApp/blob/main/public/taskComplete%20SC.png)
![images](https://github.com/YunDobi/TasksApp/blob/main/public/taskDetail%20SC.png)

## Getting Started
First, bring the mysql image and containelize
```bash
docker-compose up
# and
docker exec -i tasksapp_mysql_1 sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" $MYSQL_DATABASE' < db/schema.sql  
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

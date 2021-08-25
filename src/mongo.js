//@ts-check
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = `mongodb+srv://takaxis2:${process.env.MPASSWORD}@cluster0.jrpdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  //이거 왜 안되냐
  await client.connect();

  const users = client.db("test").collection("users");
  const cities = client.db("test").collection("cities");

  users.deleteMany({});
  cities.deleteMany({});

  await cities.insertMany([
    {
      name: "서울",
      population: 1000,
    },
    {
      name: "부산",
      population: 500,
    },
  ]);

  await users.insertMany([
    {
      name: "Foo",
      birthYear: 1998,
      contacts: [
        {
          type: "phone",
          number: "123456789",
        },
        {
          type: "home",
          number: "987654321",
        },
      ],
      city: "서울",
    },
    {
      name: "Bar",
      birthYear: 2000,
      contacts: [
        {
          type: "phone",
          number: "123456789",
        },
        {
          type: "home",
          number: "987654321",
        },
      ],
      city: "부산",
    },
    { name: "Baz", birthYear: 2002, city: "부산" },
    { name: "Poo", birthYear: 2010, city: "서울" },
  ]);

  const cursor = users.aggregate([
    {
      $lookup: {
        from: "cities",
        localField: "city",
        foreignField: "name",
        as: "city_info",
      },
    },
    {
      $match: {
        $and: [
          {
            "city_info.population": {
              $gte: 600,
            },
            birthYear: {
              $gte: 2000,
            },
          },
        ],
      },
    },
    {
      $count: "num_users",
    },
  ]);

  //   await users.updateOne(
  //     { name: "Baz" },
  //     {
  //       $set: {
  //         name: "Boo",
  //       },
  //     }
  //   );

  //await users.deleteOne({ birthYear: { $gte: 2002 } });
  //await users.deleteOne({ name: "Baz" });

  //   const cursor = users.find(
  //     { "contacts.type": "phone" }
  //     //{ sort: { birthYear: -1 } } //-1 내림차순, 1 오름차순
  //   ); //이상, Greater Than Equal
  await cursor.forEach(console.log);

  await client.close();
}
main();

// const uri = `mongodb+srv://takaxis2:${process.env.MONGO_PASSWORD}@cluster0.jrpdq.mongodb.net/Cluster0?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   // @ts-ignore
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");

//   // perform actions on the collection object
//   client.close();
// });

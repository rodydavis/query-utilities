import { assert, beforeAll, describe, it } from "vitest";
import { SearchQuery } from "./search.js";

describe("Search tests", () => {
  let query: SearchQuery<Result>;
  beforeAll(() => {
    query = new SearchQuery<Result>();
    query.addSource("todos", todos, (item, search) => ({
      type: "TODO",
      item,
      search,
    }));
    query.addSource("users", users, (item, search) => ({
      type: "USER",
      item,
      search,
    }));
  });

  it("basic search", () => {
    const search = "tempora";
    const results = query.getResults(search);

    assert.equal(results.length, 1);
    assert.equal(results[0].type, "TODO");
    assert.equal(results[0].item.id, "4");
    assert.equal(results[0].search, search);
  });

  it("field search", () => {
    const search = `title:"fugiat veniam minus"`;
    const results = query.getResults(search);

    assert.equal(results.length, 1);
    assert.equal(results[0].type, "TODO");
    assert.equal(results[0].item.id, "3");
    assert.equal(results[0].search, search);
  });

  it("user search", () => {
    const search = `name:"Leanne Graham"`;
    const results = query.getResults(search);

    assert.equal(results.length, 1);
    assert.equal(results[0].type, "USER");
    assert.equal(results[0].item.id, "1");
    assert.equal(results[0].search, search);
  });

  it("todo section search", () => {
    const search = `@todos`;
    const results = query.getResults(search);

    assert.equal(results.length, todos.length);
  });

  it("section test", () => {
    const sections = query.sections;

    assert.equal(sections.length, 2);
  });

  it("reset test", () => {
    const originalSections = query.sections;
    query.reset();

    const sections = query.sections;

    assert.equal(sections.length, 0);
    assert.notEqual(sections.length, originalSections.length);
  });
});

interface Result {
  type: string;
  item: any;
  search: string;
}

const todos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: false,
  },
];

const users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: {
        lat: "-68.6102",
        lng: "-47.0653",
      },
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
      geo: {
        lat: "29.4572",
        lng: "-164.2990",
      },
    },
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
    },
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
    },
    phone: "(254)954-1289",
    website: "demarco.info",
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
  },
];

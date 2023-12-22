import { faker } from "@faker-js/faker";

class MockApi {
  #data: React.ReactNode[];
  #pageSize: number;
  #currentPage: number = 0;

  constructor(total: number, pageSize: number) {
    this.#data = Array(total)
      .fill({})
      .map(() => (
        <>
          <h1>{faker.person.fullName()}</h1>
          <h2>{faker.person.lastName()}</h2>
          <h3>{faker.person.jobTitle()}</h3>
          <p>{faker.person.bio()}</p>
          <p>{faker.string.uuid()}</p>
        </>
      ));

    this.#pageSize = pageSize;
  }

  getMoreData() {
    const startIndex = this.#currentPage * this.#pageSize;
    const endIndex = startIndex + this.#pageSize;
    this.#currentPage++;
    return this.#data.slice(startIndex, endIndex);
  }
}

export default MockApi;

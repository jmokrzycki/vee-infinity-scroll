import { faker } from "@faker-js/faker";
import { UserData } from "./Types";

class MockApi {
  #data: UserData[];
  #pageSize: number;
  #currentPage: number = 0;

  constructor(total: number, pageSize: number) {
    this.#data = Array(total)
      .fill({})
      .map(() => ({
        fullName: faker.person.fullName(),
        lastName: faker.person.lastName(),
        jobTitle: faker.person.jobTitle(),
        bio: faker.person.bio(),
        uuid: faker.string.uuid(),
      }));

    this.#pageSize = pageSize;
  }

  getMoreData() {
    const startIndex = this.#currentPage * this.#pageSize;
    const endIndex = startIndex + this.#pageSize;
    this.#currentPage++;
    return this.#data.slice(startIndex, endIndex);
  }

  getUpdatedData() {
    this.#data = this.#data.map((element, index) => {
      if (index % 3 === 0) {
        return {
          fullName: faker.person.fullName(),
          lastName: faker.person.lastName(),
          jobTitle: faker.person.jobTitle(),
          bio: faker.person.bio(),
          uuid: element.uuid,
        };
      } else {
        return {
          fullName: element.fullName,
          lastName: element.lastName,
          jobTitle: element.jobTitle,
          bio: element.bio,
          uuid: element.uuid,
        };
      }
    });

    return this.#data.slice(0, this.#pageSize * this.#currentPage);
  }
}

export default MockApi;

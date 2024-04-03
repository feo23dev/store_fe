class User {
  #id = undefined;
  #email = undefined;
  #first_name = undefined;
  #last_name = undefined;
  #created_at = undefined;

  constructor() {
    const userFromSessionStorage = sessionStorage.getItem("User");
    if (userFromSessionStorage) {
      console.log("Yes There is User in Session");
      const userDataFromStorage = JSON.parse(userFromSessionStorage).data;
      console.log(userDataFromStorage);

      this.#id = userDataFromStorage.id;
      this.#email = userDataFromStorage.email;
      this.#first_name = userDataFromStorage.first_name;
      this.#last_name = userDataFromStorage.last_name;
      this.#created_at = userDataFromStorage.created_at;
    }
  }

  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }

  get first_name() {
    return this.#first_name;
  }

  get last_name() {
    return this.#last_name;
  }

  get created_at() {
    return this.#created_at;
  }

  async login(email, password) {
    const userLoginData = JSON.stringify({
      email,
      password,
    });

    const response = await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userLoginData,
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("ERROR JSON", json);

      throw new Error(json.message);
    } else {
      this.#id = json.data.id;
      this.#first_name = json.data.first_name;
      this.#last_name = json.data.last_name;
      this.#email = json.data.email;
      this.#created_at = json.data.created_at;
      sessionStorage.setItem("User", JSON.stringify(json));

      return json;
    }
  }
}

export default User;

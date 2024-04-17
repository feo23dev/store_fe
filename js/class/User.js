class User {
  #id = undefined;
  #email = undefined;
  #first_name = undefined;
  #last_name = undefined;
  #created_at = undefined;
  #token = undefined;
  #role = undefined;

  constructor() {
    const userFromLocalStorage = localStorage.getItem("User");
    if (userFromLocalStorage) {
      console.log("Yes There is User in Session");
      const userDataFromStorage = JSON.parse(userFromLocalStorage);
      console.log("User from storage", userDataFromStorage);

      this.#id = userDataFromStorage.data.id;
      this.#email = userDataFromStorage.data.email;
      this.#first_name = userDataFromStorage.data.first_name;
      this.#last_name = userDataFromStorage.data.last_name;
      this.#created_at = userDataFromStorage.data.created_at;
      this.#token = userDataFromStorage.token;
      this.#role = userDataFromStorage.data.role;
    }
  }

  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }
  get getRole() {
    return this.#role;
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

  get getToken() {
    return this.#token;
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

    console.log("FROM DB", json);

    if (!response.ok) {
      console.log("ERROR JSON", json);

      throw new Error(json.message);
    } else {
      this.#id = json.data.id;
      this.#first_name = json.data.first_name;
      this.#last_name = json.data.last_name;
      this.#email = json.data.email;
      this.#created_at = json.data.created_at;
      localStorage.setItem("User", JSON.stringify(json));

      return json;
    }
  }

  async getAllUsers() {
    const response = await fetch("http://localhost:5000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.#token}`,
      },
    });
    const json = await response.json();
    console.log("Users from DB", json);

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  }

  async deleteUserById(userId) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.#token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("ERROR DELETING USER", error);
    }
  }
}

export default User;

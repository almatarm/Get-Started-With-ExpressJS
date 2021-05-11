interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

export default User;

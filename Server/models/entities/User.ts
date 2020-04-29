import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Userproduct } from "./Userproduct";

@Entity("user", { schema: "toysdb" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "username", length: 50, default: () => "'0'" })
  username: string;

  @Column("varchar", { name: "password", length: 150, default: () => "'0'" })
  password: string;

  @Column("varchar", { name: "firstName", length: 50, default: () => "'0'" })
  firstName: string;

  @Column("varchar", { name: "lastName", length: 50, default: () => "'0'" })
  lastName: string;

  @Column("varchar", { name: "email", length: 50, default: () => "'0'" })
  email: string;

  @Column("varchar", { name: "role", length: 5})
  role: string;

  @OneToMany(() => Userproduct, (userproduct) => userproduct.user)
  userproducts: Userproduct[];
}

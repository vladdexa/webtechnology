import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Index("fk_userIdUserProduct", ["userId"], {})
@Index("fk_productIdUserProduct", ["productId"], {})
@Entity("userproduct", { schema: "toysdb" })
export class Userproduct {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "userId", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("int", {
    name: "productId",
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  productId: number | null;

  @ManyToOne(() => Product, (product) => product.userproducts, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => User, (user) => user.userproducts, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}

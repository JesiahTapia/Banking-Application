import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  balance!: number;
}

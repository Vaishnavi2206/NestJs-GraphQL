import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Table
export class User extends Model<User>{
  @Field(() => Int,{ nullable: true })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  })
  id: number;

  @Field(() => String,{ nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Field(() => String,{ nullable: true })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Field(() => String,{ nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}


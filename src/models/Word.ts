import { BaseEntity, Column, Entity, Index } from "typeorm";

@Entity("dictionary")
@Index("word_index", ["word"])
export class dictionary extends BaseEntity {
  @Column("integer", {
    nullable: false,
    primary: true,
    name: "Id"
  })
  Id: number;

  @Column("text", {
    nullable: true,
    name: "word"
  })
  word: string | null;

  @Column("text", {
    nullable: true,
    default: () => "''",
    name: "englishDefinition"
  })
  englishDefinition: string | null;

  @Column("text", {
    nullable: true,
    default: () => "''",
    name: "l2Definition"
  })
  l2Definition: string | null;

  @Column("text", {
    nullable: true,
    default: () => "''",
    name: "notes"
  })
  notes: string | null;

  @Column("text", {
    nullable: true,
    default: () => "''",
    name: "examples"
  })
  examples: string | null;

  @Column("text", {
    nullable: true,
    default: () => "''",
    name: "activeVerb"
  })
  activeVerb: string | null;

  @Column("text", {
    nullable: true,
    default: () => "''",
    name: "passiveVerb"
  })
  passiveVerb: string | null;
}

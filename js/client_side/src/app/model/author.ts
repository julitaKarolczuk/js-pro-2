export class Author {
  public authorId: number;
  public firstName: string;
  public lastName: string;
  public description: string;

  static clone(author: Author){
    let clone = new Author();
    clone.authorId = author.authorId;
    clone.firstName = author.firstName;
    clone.lastName = author.lastName;
    clone.description = author.description;

    return clone;
  }
}

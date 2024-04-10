import HtmlNotes from "./HtmlNotes";
export const markdown = `
# Understanding LINQ in C#

LINQ (Language Integrated Query) is a powerful feature in C# that allows developers to query data from different data sources using a unified syntax. Here are some key points from our bootcamp group's discussion about LINQ:

## Benefits of LINQ:

- Provides a consistent way to query various data sources such as arrays, collections, databases, XML, and more.
- Enables developers to write queries directly within C# code, making code more readable and maintainable.
- Supports both query and method syntax, giving developers flexibility in writing queries.
- Offers powerful features like filtering, sorting, grouping, and joining data.

## Basic LINQ Query Syntax:

LINQ query syntax resembles SQL syntax and consists of three main clauses: \`from\`, \`where\`, and \`select\`.
`;

function MobNotes({text}:{text:string}) {
  return (
    <>
      <h2 className="text-3xl py-4 border-b-2 border-black">Your Mob</h2>

        <HtmlNotes name="Kind Coders" text={text} />
    </>
  );
}

export default MobNotes;

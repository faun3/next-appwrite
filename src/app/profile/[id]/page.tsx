interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: PageProps) => {
  return (
    <div>
      <h1>You are on the profile with an id of {id}</h1>
    </div>
  );
};
export default Page;

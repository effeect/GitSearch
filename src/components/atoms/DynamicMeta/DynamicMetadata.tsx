const DynamicMetadata = ({
  description = "Default Description",
  title = "GitSearch Page",
}: {
  description: string;
  title: string;
}) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
};

export default DynamicMetadata;

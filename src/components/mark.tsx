export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  // console.log('=====',name)
  // console.log('++++++',keyword);

  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  // console.log('---',arr)
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257afd" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};

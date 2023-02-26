import { Link } from 'react-router-dom';
import FileIcon from './FileIcon';

interface FileProps {
  file: {
    name: string,
    path: string,
  }
  repoName: string,
  owner: string,
};

function File({ file, repoName, owner }: FileProps) {
  return (
    <Link
      to={`/repositories/${owner}/${repoName}/${file.path}`}
      className="cursor-default whitespace-nowrap hover:font-bold"
    >
      <FileIcon name={file.name} />
      {file.name}
    </Link>
  );
}

export default File;

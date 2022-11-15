import md5 from 'md5';

const getPasswordHash = (password: string) => {
  const hash = md5(password);
  return hash;
};

export default getPasswordHash;

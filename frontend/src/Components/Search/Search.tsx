import React, { ChangeEvent, SyntheticEvent } from "react";

type Props = {
  onClick: (e: SyntheticEvent) => void;
  search: string | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div>
      <input
        type="text"
        value={props.search}
        onChange={(e) => props.handleChange(e)}
      />
      <button onClick={(e) => props.onClick(e)}>Click</button>
    </div>
  );
};

export default Search;

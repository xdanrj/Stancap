import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

const TagSelectorComponent = () => {
  const [tags, setTags] = useState([])
  return (
    <>
      <TagsInput
        value={tags}
        onChange={setTags}
        name="fruits"
        placeHolder="enter fruits"
      />
    </>
  )
}

export default TagSelectorComponent
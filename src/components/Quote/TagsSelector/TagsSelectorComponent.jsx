import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

import "./TagsSelectorComponent.css"


const TagSelectorComponent = ({tags, setTags}) => {
  
  return (
    <>
      <TagsInput
        value={tags}
        onChange={setTags}
        name="tags"
        placeHolder="Digite a tag e dê enter"
      />
    </>
  )
}

export default TagSelectorComponent
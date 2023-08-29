import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

import "./TagsSelectorComponent.css"
const classNames = {
  
}

const TagSelectorComponent = ({tags, setTags}) => {
  
  return (
    <>
      <TagsInput
        value={tags}
        onChange={setTags}
        name="tags"
        placeHolder="Digite a tag e dê enter"
        classNames="{tag: tag-cls, input: input-cls}"
      />
    </>
  )
}

export default TagSelectorComponent
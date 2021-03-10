
import React from 'react';

export  const addSuggestion = (suggestions: {}) => {
    return {
      type: 'SHOW_SUGGESTION',
      payload: suggestions
    }
  }

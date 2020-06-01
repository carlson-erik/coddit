const OneDark = { 
  background: '#282c34',
  foreground: '#7f848e',
  values: {
    integer: '#d19a66',
    boolean: '#d19a66',
    string: '#98c379',
  },
  general : {
    comment: '#5c6370',
    submitter: 'red',
    score: {
      ups: '#d19a66',
      downs: '#61afef',
    },
  },
  languages: {
    csharp: {
      using: '#c678dd',
      usingPackage: '#e5c07b',
      namespace: '#c678dd',
      namespaceName: '#e5c07b',
      publicWord: '#c678dd',
      class: '#c678dd',
      className: '#e5c07b',
      functionName: '#61afef',
      parameterType: '#c678dd',
      parameterName: '',
      variableWord: '#c678dd',
      variableName: '#e06c75',
      newWord: '#c678dd',
      codeObject: {
        topLevel: '',
        child: '#e06c75',
      }
    },
    javascript: {
      constWord: '#c678dd',
      variableName: '#e5c07b',
      class: '#c678dd',
      className: '#e5c07b',
      extends: '#c678dd',
      extendsName: '#e5c07b',
      functionName: '#61afef',
      functionWord: '#c678dd',
      parameterName: '#e06c75',
      codeObject: {
        topLevel: '#e5c07b',
        child: '#e06c75',
      }
    },
    python: {
      def: '#c678dd',
      functionName: '#61afef',
      parameterName: '#d19a66',
    },
  }
};

export default OneDark;
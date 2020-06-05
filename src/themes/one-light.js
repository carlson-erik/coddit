const OneLight = { 
  background: '',
  foreground: '',
  values: {
    integer: '',
    boolean: '',
    string: '',
  },
  general : {
    comment: '',
    submitter: '',
    score: {
      ups: '',
      downs: '',
    },
  },
  languages: {
    csharp: {
      using: '',
      usingPackage: '',
      namespace: '',
      namespaceName: '',
      publicWord: '',
      classWord: '',
      className: '',
      functionName: '',
      parameterType: '',
      parameterName: '',
      variableWord: '',
      variableName: '',
      newWord: '',
      codeObject: {
        topLevel: '',
        child: '',
      }
    },
    javascript: {
      constWord: '',
      variableName: '',
      classWord: '',
      className: '',
      extendsWord: '',
      extendsName: '',
      functionName: '',
      functionWord: '',
      parameterName: '',
      codeObject: {
        topLevel: '',
        child: '',
      }
    },
    python: {
      def: '',
      functionName: '',
      parameterName: '',
      forWord: '',
      inWord: '',
      rangeWord: '',
    },
  }
};

export default OneLight;
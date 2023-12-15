// import React from "react";
// import Highlight from "prism-react-renderer";
// import theme from "prism-react-renderer/themes/nightOwl";
// import Title from "../components/title";
// const getParams = (className = ``) => {
//     const [lang = ``, params = ``] = className.split(`:`);
//     return [lang.split(`language-`).pop().split(`{`).shift()].concat(
//         params.split(`&`).reduce((merged, param) => {
//             const [key, value] = param.split(`=`);
//             merged[key] = value;
//             return merged;
//         }, {})
//     );
// };

// const SyntaxHiglight = (props) => {
//     const className = props.children.props.className || "";
//     const [language, { title = `` }] = getParams(className);
//     const ifTitle = (title || language) && { marginTop: `0px` };
//     return (
//         <Highlight
//             {...defaultProps}
//             theme={theme}
//             code={props.children.props.children.trim()}
//             language={language}
//         >
//             {({ className, style, tokens, getLineProps, getTokenProps }) => (
//                 <>
//                     <Title className="code-title" text={title}>
//                         {language}
//                     </Title>
//                     <pre className={className} style={{ ...style, ...ifTitle }}>
//                         {tokens.map((line, i) => {
//                             return (
//                                 <div
//                                     key={i}
//                                     {...getLineProps({ line, key: i })}
//                                 >
//                                     {line.map((token, key) => (
//                                         <span
//                                             {...getTokenProps({ token, key })}
//                                         />
//                                     ))}
//                                 </div>
//                             );
//                         })}
//                     </pre>
//                 </>
//             )}
//         </Highlight>
//     );
// };
// const Code = (props) => <SyntaxHiglight {...props} />;
// export default Code;

'use client';
import { styled } from 'styled-components';

interface IResultsBlockProps {
  content: string[];
  subject: string;
  variant: string;
}

const QuotedText = styled.blockquote`
  background: #f9f9f9;
  border-left: 10px solid #ccc;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  quotes: "\201C""\201D""\2018""\2019";

  &:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }
  & p {
    display: inline;
  }
`;

export const ResultsBlock = ({ content, subject, variant }: IResultsBlockProps) => {
  return (
    <>
      <h2>{variant}</h2>
    
      <p>The page {content.length ? 'appears' : 'does not appear'}
      {' '}to have information about {variant.toLowerCase()} for { subject }.</p>

      {content.map(example => (
        <QuotedText key={example}><p>{example}</p></QuotedText>
      ))}
    </>
  );
};

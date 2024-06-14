import axios from 'axios';
import { JSDOM } from 'jsdom';
import Link from 'next/link';
import { ResultsBlock } from './ResultsBlock';
import type { Metadata } from 'next';

interface IFindingsProps {
  searchParams: { [key: string]: string };
}

interface IGetDataProps {
  url: string;
}

enum Variants {
  Bankruptcy = 'Bankruptcy',
  Fraud = 'Fraud',
}

export const metadata: Metadata = {
  title: 'Findings — Wikipedia Bankruptcy/Fraud Scraper',
};

const getData = async ({ url }: IGetDataProps) => {
  const { data } = await axios.get(url);

  return data;
};

const parseData = (data: string) => {
  const dom = new JSDOM(data);

  const subject = (dom.window.document.querySelector('title')?.textContent ?? '').replace(' - Wikipedia', '');

  const content = dom.window.document.querySelector('#mw-content-text');
  const paragraphs = content?.querySelectorAll('p') ?? [];

  const bankruptcyContent = Array.from(paragraphs)
    .filter(paragraph => /bankrupt/.test(paragraph.textContent ?? ''))
    .map(paragraph => paragraph.textContent ?? '');

  const fraudContent = Array.from(paragraphs)
    .filter(paragraph => /fraud/.test(paragraph.textContent ?? ''))
    .map(paragraph => paragraph.textContent ?? '');

  return {
    findings: [{
      content: bankruptcyContent,
      variant: Variants.Bankruptcy,
    }, {
      content: fraudContent,
      variant: Variants.Fraud
    }],
    subject,
  };
}

export default async function Findings({ searchParams }: Readonly<IFindingsProps>) {
  const { url } = searchParams;
  const data = await getData({ url });

  const { findings, subject } = parseData(data);

  return (
    <main>
      <h1>Findings — Wikipedia Bankruptcy/Fraud Scraper</h1>

      <dl>
        <dt>Page</dt>
        <dd><a href={url}>{ url }</a></dd>
        <dt>Subject</dt>
        <dd>{ subject }</dd>
      </dl>

      <Link href="/" className="button">Search again</Link>

      {findings.map(({ content, variant }) => (
        <ResultsBlock content={content} subject={subject} variant={variant} key={variant} />
      ))}
    </main>
  );
}

import React from "react";
import SectionHeader from "../components/ui/SectionHeader";
import Layout from "../components/ui/Layout";
import { publications } from "../data/publications";

const Publications: React.FC = () => {
  return (
    <Layout>
      <SectionHeader title="Publications" />
      <div className="space-y-5">
        {publications.map((pub, index) => (
          <div
            key={index}
            className="text-gray-700 leading-relaxed pl-6 border-l-4 border-gray-300"
          >
            <p className="mb-1">
              {pub.authors}, "{pub.title}," <em>{pub.venue}</em>
              {pub.volume && `, ${pub.volume}`}
              {pub.pages && `, ${pub.pages}`}
              {`, (${pub.year})`}
              <a
                className="text-blue-600 hover:underline"
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pub.doi && `, doi: ${pub.doi}`}
              </a>
              {pub.toAppear && ", (to appear)."}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Publications;

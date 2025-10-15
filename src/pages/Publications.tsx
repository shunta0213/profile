import React from "react";
import SectionHeader from "../components/ui/SectionHeader";
import Card from "../components/ui/Card";
import Layout from "../components/ui/Layout";
import { publications } from "../data/publications";

const Publications: React.FC = () => {
  return (
    <Layout>
      <SectionHeader title="Publications" tail={`Total: ${publications.length}`} />
      <div className="space-y-5">
        {publications.map((pub, index) => (
          <Card key={index}>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">{pub.title}</h3>
            <div className="text-gray-600 space-y-1">
              <p>{pub.authors}</p>
              <p><span className="italic">{pub.venue}</span>, {pub.year}{pub.volume && `, ${pub.volume}`}{pub.pages && `, ${pub.pages}`}</p>
              {pub.doi && (
                <p>
                  <a
                    className="text-blue-600 hover:underline"
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pub.doi}
                  </a>
                </p>
              )}
              {pub.toAppear && <p className="text-amber-600 font-semibold">To appear</p>}
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Publications;

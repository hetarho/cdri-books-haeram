const Title1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

const Title2 = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-[22px] font-bold">{children}</h2>;
};

const Title3 = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-lg font-bold">{children}</h3>;
};

const Body1 = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-[20px] font-medium">{children}</p>;
};

const Body2 = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm font-medium">{children}</p>;
};

const Body2Bold = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm font-bold">{children}</p>;
};

const Caption = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-base font-medium">{children}</p>;
};

const Small = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-[10px] font-medium">{children}</p>;
};

export const Typography = {
  Title1,
  Title2,
  Title3,
  Body1,
  Body2,
  Body2Bold,
  Caption,
  Small,
};

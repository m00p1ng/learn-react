function PricingPlan({ title, price, perks, icon }: any) {
  const Icon = icon;
  return (
    <article>
      <header>
        <div className="icon">
          <Icon />
        </div>
        <h2>{title}</h2>
        <p>{price}</p>
      </header>
      <div className="plan-content">
        <ol>
          {perks.map((perk: any) => (
            <li key={perk}>{perk}</li>
          ))}
        </ol>
        <div className='actions'>
          <a href="/not-implemented">Learn More</a>
        </div>
      </div>
    </article>
  );
}

export default PricingPlan;

export interface Stat { value:string; label:string; }
export default function StatBlock({stats,className=""}: {stats:Stat[];className?:string}) {
  return <div className={`inner-stat inner-card max-w-6xl mx-auto ${className}`}>{stats.map(stat=><div key={stat.label}><strong>{stat.value}</strong><small>{stat.label}</small></div>)}</div>;
}


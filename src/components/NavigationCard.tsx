import { Link } from 'react-router-dom';

type NavigationCardProps = {
  title: string;
  description: string;
  to: string;
  className?: string;
};

export function NavigationCard({ title, description, to, className }: NavigationCardProps) {
  return (
    <article className={`info-card nav-card${className ? ` ${className}` : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={to} className="text-link">
        Open section
      </Link>
    </article>
  );
}

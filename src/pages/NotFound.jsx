import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import SplitHeading from '../components/SplitHeading';
import { Cloche } from '../components/FoodIllustrations';
import '../styles/contact.css';

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page not found" description="The page you were looking for could not be found. Head back to Sunrise Caterers & Event Management." />
      <section className="nf">
        <div className="container nf-inner">
          <div className="nf-art" aria-hidden="true">
            <Cloche open />
          </div>
          <p className="eyebrow">Error 404</p>
          <SplitHeading as="h1" className="h-hero" lines={['This plate is', '*empty.*']} />
          <p className="hero-lead">The page you were looking for isn’t here, but plenty of good things are.</p>
          <div className="hero-cta">
            <Link className="btn btn-primary btn-lg" to="/">
              Back to home <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link className="btn btn-ghost btn-lg" to="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

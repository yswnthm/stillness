import React, { useEffect } from 'react';
import { BlogHero } from '../components/blog/BlogHero';
import { FeaturedArticle } from '../components/blog/FeaturedArticle';
import { CategoryFilters } from '../components/blog/CategoryFilters';
import { ArticleCard } from '../components/blog/ArticleCard';
import { NewsletterCTA } from '../components/blog/NewsletterCTA';
import { ARTICLES } from '../constants';

const CATEGORIES = ['All', 'Wellness', 'Meditation', 'Ritual', 'Breathwork', 'Corporate'];

export const BlogPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = React.useState('All');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const featuredArticle = ARTICLES.find(a => a.featured);
    const filteredArticles = ARTICLES.filter(a => !a.featured && (activeCategory === 'All' || a.category === activeCategory));

    return (
        <div className="min-h-screen bg-cream">
            <main>
                <BlogHero />

                {/* Featured Article */}
                {featuredArticle && <FeaturedArticle article={featuredArticle} />}

                {/* Category Filters */}
                <CategoryFilters
                    categories={CATEGORIES}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                {/* Article Grid */}
                <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredArticles.map((article, index) => (
                            <React.Fragment key={article.id}>
                                <ArticleCard article={article} />
                                {/* Newsletter CTA injected after 2nd article */}
                                {index === 1 && <NewsletterCTA />}
                            </React.Fragment>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BlogPage;

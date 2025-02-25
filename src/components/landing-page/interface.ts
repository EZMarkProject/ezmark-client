/**
 * LandingPage component interface definition
 */

export interface LandingPageProps {
    /**
     * Optional custom className for styling
     */
    className?: string;

    /**
     * Optional callback for CTA button click
     */
    onGetStartedClick?: () => void;

    /**
     * Optional data for features section
     */
    featuresData?: {
        title: string;
        description: string;
        icon?: React.ReactNode;
    }[];

    /**
     * Optional data for testimonials section
     */
    testimonialsData?: {
        content: string;
        author: string;
        role: string;
        avatar?: string;
    }[];
}

export interface NavbarProps {
    /**
     * Optional custom className for styling
     */
    className?: string;

    /**
     * Optional callback for login button click
     */
    onLoginClick?: () => void;

    /**
     * Optional callback for sign up button click
     */
    onSignUpClick?: () => void;
} 
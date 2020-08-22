// Card Tools
// -----------------------------------
import React, { Component } from 'react';

/** triggers before card is removed */
export type CardToolOnRemove = (card: HTMLDivElement, confirm: () => void) => void;
/** triggers after card was removed */
export type CardToolOnRemoved = () => void;
/** triggers when user click on refresh button */
export type CardToolOnRefresh = (card: HTMLDivElement, confirm: () => void) => void;

export interface CardToolProps {
    /** show the refreshe icon */
    refresh: boolean;
    /** show the remove icon */
    dismiss: boolean;
    /** name if the icon class to use as spinner */
    spinner: String;
    onRemove: CardToolOnRemove;
    onRemoved: CardToolOnRemoved;
    onRefresh: CardToolOnRefresh;
}

/**
 * Add action icons to card components to allow
 * refresh data or remove a card element
 */
class CardTool extends Component<CardToolProps> {
    element = React.createRef<HTMLDivElement>();

    static defaultProps = {
        refresh: false,
        dismiss: false,
        onRemove: () => {},
        onRemoved: () => {},
        onRefresh: () => {},
        spinner: 'standard'
    };

    /**
     * Helper function to find the closest
     * ascending .card element
     */
    getCardParent(item: HTMLDivElement | null) {
        var el = item && item.parentElement;
        while (el && !el.classList.contains('card')) el = el.parentElement;
        return el;
    }

    handleDismiss = (e: React.MouseEvent) => {
        // find the first parent card
        const card = this.getCardParent(this.element.current) as HTMLDivElement;

        const destroyCard = () => {
            // remove card
            if (card && card.parentNode) card.parentNode.removeChild(card);
            // An event to catch when the card has been removed from DOM
            this.props.onRemoved();
        };

        const animate = (item: HTMLDivElement | null, cb: Function) => {
            if (item && 'onanimationend' in window) {
                const animationEndCallback = () => {
                    cb();
                    item.removeEventListener('animationeend', animationEndCallback);
                };
                // animation supported
                item.addEventListener('animationend', animationEndCallback);
                item.className += ' animated bounceOut'; // requires animate.css
            } else cb(); // no animation, just remove
        };

        const confirmRemove = () => {
            animate(card, () => {
                destroyCard();
            });
        };

        // Trigger the event and finally remove the element
        this.props.onRemove(card, confirmRemove);
    };

    handleRefresh = (e: React.MouseEvent) => {
        const WHIRL_CLASS = 'whirl';
        const card = this.getCardParent(this.element.current) as HTMLDivElement;

        const showSpinner = function(card: HTMLDivElement, spinner: Array<string>) {
            card.classList.add(WHIRL_CLASS);
            spinner.forEach(function(s) {
                card.classList.add(s);
            });
        };

        // method to clear the spinner when done
        const done = () => {
            card.classList.remove(WHIRL_CLASS);
        };
        // start showing the spinner
        showSpinner(card, this.props.spinner.split(' '));
        // event to remove spinner when refres is done
        this.props.onRefresh(card, done);
    };

    render() {
        return (
            <div ref={this.element} className="card-tool float-right">
                {this.props.refresh && <em onClick={this.handleRefresh} className="fas fa-sync" />}
                {this.props.dismiss && <em onClick={this.handleDismiss} className="fa fa-times" />}
            </div>
        );
    }
}

export default CardTool;

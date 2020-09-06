import React from 'react';

interface classProps {
  total: number,
  page: number,
  listNum: number,  // row of list
  pageNum?: number, // row of pagination list
  goPage?: any
}

class Pagination extends React.PureComponent<classProps|any,any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startPage: 1,
      endPage: 1,
      currentPageGroup: 1,
      totalPage: 1,
      totalPageGroup: 1,
      pageNum: 6,
      listNum: 10,
      pageList: '',
      isShowEndPage: false
    };
  }

  componentDidMount(): void {
    this._calcPage();
  }

  componentDidUpdate(prevProps: Readonly<classProps | any>, prevState: Readonly<any>, snapshot?: any): void {
    if (prevProps !== this.props) {
      this._calcPage();
    }
  }

  _calcPage = () => {
    const listNum = this.props.listNum || 6;
    const pageNum = this.props.pageNum || 10;
    const startPage = Math.floor((this.props.page - 1) / pageNum) * pageNum + 1;
    let currentPageGroup = Math.floor(this.props.page / pageNum);
    if (this.props.page % pageNum !== 0) {
      currentPageGroup += 1;
    }

    let totalPageGroup = Math.ceil((this.props.totalPage || (this.props.total / listNum)) / pageNum);
    let totalPage = this.props.totalPage || Math.floor(this.props.total / listNum) + ((this.props.total % listNum) !== 0 ? 1 : 0);
    let endPage = startPage + (pageNum - 1);

    if (totalPage < endPage) { endPage = totalPage; }
    if (endPage < 1) { endPage = 1; }
    if (totalPage < 1) { totalPage = 1; }
    if (totalPageGroup < 1) { totalPageGroup = 1; }

    this.setState({
      pageNum,
      listNum,
      startPage,
      endPage,
      totalPage,
      totalPageGroup,
      currentPageGroup,
      isShowEndPage: (totalPage > (pageNum + 1) && endPage !== totalPage)
    }, () => {
      this._setPageList();
    });
  };

  _prevPageGroup = () => {
    if (this.props.goPage) {
      this.props.goPage(((this.state.currentPageGroup - 2) * this.state.pageNum) + 1);
    }
  };

  _nextPageGroup = () => {
    if (this.props.goPage) {
      this.props.goPage((this.state.currentPageGroup * this.state.pageNum) + 1);
    }
  };

  _prevPage = () => {
    if (this.props.goPage) {
      this.props.goPage(this.props.page - 1);
    }
  };

  _nextPage = () => {
    if (this.props.goPage) {
      this.props.goPage(this.props.page + 1);
    }
  };

  _goPage = (event: any) => {
    const targetPage: number = parseInt(event.target.dataset.page, 10);
    if (this.props.goPage && this.props.page !== targetPage) {
      this.props.goPage(targetPage);
    }
  };

  _setPageList = () => {
    const pageList: any = [];

    for (let i = this.state.startPage; i <= this.state.endPage; i++) {
      pageList.push(
          <li className={`page-item ${this.props.page === i ? 'on' : ''}`} key={i}>
            <button className="page-link" onClick={ this._goPage } data-page={ i }>{ i }</button>
          </li>
      );
    }

    this.setState({
      pageList: pageList
    });
  };

  render () {
    return (
        <div className="container">
          <ul className="pagination">
            { this.props.page !== 1 && (<li className="page-item"><button className="page-link" onClick={ this._prevPage }>Previous</button></li>) }
            { this.state.pageList }
            { this.state.isShowEndPage && (<li className="page-item"><button className="page-link">&middot;&middot;&middot;</button></li>)}
            { this.state.isShowEndPage && (<li className="page-item"><button className="page-link" onClick={ this._goPage } data-page={ this.state.totalPage }>{ this.state.totalPage }</button></li>)}
            { this.props.page !== this.state.totalPage && (<li className="page-item"><button className="page-link" onClick={ this._nextPage }>Next</button></li>) }
          </ul>
        </div>
    )
  }
}

export default Pagination;

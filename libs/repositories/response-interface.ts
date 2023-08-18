export class ResponseInterface {
    skip;
    search;
    orderBy = {};
    totalpage;
    currentPage;
    resPerPage;
    constructor(query) {
      //pagination
      this.resPerPage = parseInt(query.pageSize) || 10;
      this.currentPage = query.pageIndex || 1;
      this.skip = this.resPerPage * (this.currentPage - 1);
      this.search = query.search || '';
  
      try {
        if (query.orderby && query.ordertype) {
          this.orderBy[query.orderby] = query.ordertype;
        }
      } catch (err) {
        console.error(err);
      }
    }
  
    response(totalNoOfItem, code, message, status, data, orderBy, orderType) {
      const totalPages = Math.ceil(totalNoOfItem / this.resPerPage);
      const response = {
        code: code,
        message: message,
        status: status,
        data: {
          totalrecord: totalNoOfItem,
          pageIndex: this.currentPage,
          totalPages: totalPages,
          data: data,
          orderBy: orderBy,
          orderType: orderType,
        },
      };
  
      return response;
    }
  }
  
package edu.wtbu.pojo;

public class Page {
    private int total;
    private int startPage;
    private int pageSize;

    public Page(int total, int startPage, int pageSize) {
        this.total = total;
        this.startPage = startPage;
        this.pageSize = pageSize;
    }

    public Page() {
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public void setStartPage(int startPage) {
        this.startPage = startPage;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotal() {
        return total;
    }

    public int getStartPage() {
        return startPage;
    }

    public int getPageSize() {
        return pageSize;
    }
}

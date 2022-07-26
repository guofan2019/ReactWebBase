package com.telecwin.monetdb;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class HelloMonetJDBC {
    private static final Logger logger = LoggerFactory.getLogger(MonetDbHelloWorld.class);

    public static void main(String[] args) throws SQLException, UnsupportedEncodingException {
//        String dbUrl = "jdbc:monetdb://localhost:50000/HundredMillion";
        String dbUrl = "mapi:monetdb://localhost:50000/12HundredMillion";
        long start = System.currentTimeMillis();
        Connection connection = DriverManager.getConnection(dbUrl, "monetdb", "monetdb");
        long end = System.currentTimeMillis();
        logger.debug("获取连接耗时：{} ms", end-start);
        MonetDbHelloWorld monetDbHelloWorld = new MonetDbHelloWorld();
        monetDbHelloWorld.testQuery(connection,
                "select 货主名称,sum(应付金额) from 订单 group by 货主名称;"
        );
    }
}

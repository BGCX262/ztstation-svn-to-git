package test;

import hibernate.pojo.Person;
import hibernate.pojo.PersonDAO;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import service.interfaces.BaseDAOI;

public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		final ApplicationContext ctx = new FileSystemXmlApplicationContext(
				"WebRoot/WEB-INF/applicationContext.xml");
		// System.out.println(ctx);
		final SessionFactory sf = (SessionFactory) ctx
				.getBean("sessionFactory");

		BaseDAOI bdao = (BaseDAOI) ctx.getBean("baseDAO");
		// HibernateTransactionManager
		// tmgr=(HibernateTransactionManager)ctx.getBean("transactionManager");
		try {

			// Session session = bdao.getHibernateTemplate().getSessionFactory()
			// .openSession();
			//			
			// Transaction ts=session.beginTransaction();

			Person p = new Person();

			p.setName("张中伟");
			p.setBirth(new Date());
			p.setSala(1000.00);

			// PersonDAO po = new PersonDAO();

			// bdao.save(p);
			PersonDAO pdao = (PersonDAO) ctx.getBean("personDAO");
			// Session session = pdao.getSessionFactory().openSession();
			// Transaction tx = session.beginTransaction();
			// tx.begin();
			// p=pdao.findById(1L);
			// p.setName("aaaaaaaaaaaaaaa");

			// Transaction ts = pdao.getHibernateTemplate().getSessionFactory()
			// .getCurrentSession().beginTransaction();
			// ts.begin();

			List list1 = new ArrayList();
			list1.add(p);
			// list1.add(po);

			pdao.getHibernateTemplate().saveOrUpdateAll(list1);
			// ts.commit();
			// tx.commit();
			// tx.rollback();
			// session.close();

			// 编程式事务实现
			PlatformTransactionManager tm = (PlatformTransactionManager) ctx
					.getBean("transactionManager");

			TransactionTemplate tt = new TransactionTemplate(tm);

			tt.execute(new TransactionCallbackWithoutResult() {
				protected void doInTransactionWithoutResult(TransactionStatus ts) {
					try {
						// ctx需定义为final 才能在内部类中使用
						HibernateTemplate ht = new HibernateTemplate(sf);
						Person p1 = new Person();

						p1.setName("transaction");
						ht.save(p1);
						// throw new Exception();

					} catch (Exception e) {
						e.printStackTrace();
						ts.setRollbackOnly();
					}

				}

			}

			);

			// --以上为编程式事务的实现

			List list = bdao.findAll(" from Person ");
			for (Object o : list) {
				System.out.println(((Person) o).getName());
			}
			System.out.println("-----------end------------------");

			// ts.commit();
		} catch (Exception re) {
			re.printStackTrace();
		}

	}
}

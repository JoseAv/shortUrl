create table url(
    id serial primary key,
    url text not null,
    create_at date default  now() not null ,
    last_view date default  now() not null,
    code varchar(255) unique
);



create or replace function fn_create_url(p_url text,p_code varchar(255)default null)
    returns int
as $$
    declare
        codeUrl int;

        begin
                insert into url(url, code) VALUES (p_url,p_code) returning id into codeUrl;

                return codeUrl;
        end;

    $$ language plpgsql;



create or replace function fn_get_url(fn_id int)
    returns text
as $$
    declare
        newUrl text;
    begin
        select url from url where id = fn_id into newUrl;

        if newUrl is null then
            raise exception 'URL no valida';
        end if;

        update url
            set last_view = now() where id = fn_id;
        return  newUrl;
    end;
    $$ language plpgsql;

select fn_get_url(1);

select * from url;
select * from url;
